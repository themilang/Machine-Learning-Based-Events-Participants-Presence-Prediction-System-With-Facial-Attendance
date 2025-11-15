from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import json
import pandas as pd
from typing import Optional, Dict, Any

# --- CONFIGURATION ---
# Note: MongoDB connection is removed here as data is passed directly from Next.js

# --- LOAD ASSETS ---
try:
    # Load the trained Random Forest model
    MODEL = joblib.load('random_forest_model.joblib')
    # Load the ordered list of feature names (1440 columns)
    with open('model_features.json', 'r') as f:
        MODEL_FEATURES = json.load(f)
except FileNotFoundError:
    print("FATAL ERROR: Model files not found. Run the joblib save step first.")
    exit()

# --- INITIALIZE APP ---
app = FastAPI()

# --- Pydantic Schema for MongoDB Registration Document ---
# Define the fields required by the model, matching your schema
class RegistrationInput(BaseModel):
    _id: str
    Record_ID: Optional[int] = None # Assuming you might add this manually
    Person_ID: Optional[int] = None
    Event_ID: Optional[int] = None
    
    # These MUST match the features the model was trained on
    District: str
    Place_of_Residence: str
    Urban_Rural: str
    Occupation: str
    Event_Category: str
    Mode_of_Transport: str
    Past_Participant: str
    Event_Relevance: str
    Location_Closeness: str
    IsRegistered: str # Should always be 'Yes' for this API, but kept for consistency


# --- PREPROCESSING AND PREDICTION FUNCTION ---
def preprocess_and_predict(record: Dict[str, Any]):
    """
    Takes a single registration dictionary, preprocesses it, and predicts attendance.
    """
    # 1. Convert single dict to DataFrame
    df_raw = pd.DataFrame([record])
    
    # 2. Select only the features the model needs
    # We explicitly list the columns that are features
    feature_cols = [
        'District', 'Place_of_Residence', 'Urban_Rural', 'Occupation', 
        'Event_Category', 'Mode_of_Transport', 'Past_Participant', 
        'Event_Relevance', 'Location_Closeness', 'IsRegistered'
    ]
    df_features = df_raw[feature_cols]

    # 3. One-Hot Encode
    X_encoded = pd.get_dummies(df_features, drop_first=True)

    # 4. Align features with the training model's 1440 columns
    X_processed = pd.DataFrame(0, index=[0], columns=MODEL_FEATURES)
    for col in X_encoded.columns:
        if col in MODEL_FEATURES:
            X_processed[col] = X_encoded[col].iloc[0]

    # 5. Predict
    predictions_numeric = MODEL.predict(X_processed)
    predictions_prob = MODEL.predict_proba(X_processed)[0] # Get probabilities for the single record
    
    # 6. Map results
    result_map = {1: True, 0: False} # Use boolean for Next.js

    return {
        "will_attend": result_map[predictions_numeric[0]],
        "probability_present": round(predictions_prob[1] * 100, 2),
        "probability_absent": round(predictions_prob[0] * 100, 2)
    }

# --- API ENDPOINT ---
@app.post("/predict")
async def predict_single_registration(registration: RegistrationInput):
    """
    Receives a single registration document and returns attendance prediction.
    """
    try:
        # Convert Pydantic model to dict for processing
        record_dict = registration.model_dump()
        
        prediction_results = preprocess_and_predict(record_dict)
        
        return prediction_results
    
    except Exception as e:
        # Log the error internally
        print(f"Prediction processing error: {e}")
        raise HTTPException(status_code=500, detail="Prediction processing failed on Python side.")

# To run: uvicorn api:app --reload