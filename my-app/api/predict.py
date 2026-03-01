from http.server import BaseHTTPRequestHandler
import json
import joblib
import pandas as pd
import numpy as np
import os

model_path = os.path.join(os.path.dirname(__file__), "..", "public", "model.pkl")

model_data = None
if os.path.exists(model_path):
    model_data = joblib.load(model_path)

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)

        if not model_data:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Model not loaded"}).encode())
            return

        try:
            input_df = pd.DataFrame([data])
            
            numeric_cols = ['Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed', 
                            'NumCreditLines', 'InterestRate', 'LoanTerm', 'DTIRatio']
            for col in numeric_cols:
                input_df[col] = pd.to_numeric(input_df[col])

            categorical_cols = ['Education', 'EmploymentType', 'MaritalStatus', 'HasMortgage', 
                                'HasDependents', 'LoanPurpose', 'HasCoSigner']
            
            processed_df = pd.get_dummies(input_df, columns=categorical_cols)
            
            final_df = processed_df.reindex(columns=model_data['columns'], fill_value=0)
            
            model = model_data['model']
            threshold = model_data.get('threshold', 0.5)
            
            prediction_prob_1 = model.predict_proba(final_df)[0][1]
            
            prediction = 1 if prediction_prob_1 >= threshold else 0
            
            if prediction == 1:
                confidence = int(prediction_prob_1 * 100)
            else:
                confidence = int((1 - prediction_prob_1) * 100)
            
            eligible = (prediction == 0)
            
            message = "Based on your financial profile, your loan application looks strong. You meet the key eligibility criteria." if eligible else "Your profile currently falls below our eligibility threshold. Consider improving your credit score or reducing your DTI ratio."
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "eligible": eligible,
                "confidence": confidence,
                "message": message
            }).encode())

        except Exception as e:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
