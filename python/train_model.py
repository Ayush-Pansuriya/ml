import pandas as pd
import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score, precision_recall_curve
import numpy as np
import os

try:
    import kagglehub
    path = kagglehub.dataset_download("nikhil1e9/loan-default")
    csv_file_path = os.path.join(path, "Loan_default.csv")
except Exception:
    csv_file_path = "Loan_default.csv"

print(f"Loading dataset from: {csv_file_path}")
df = pd.read_csv(csv_file_path)

df_processed = df.copy()
df_processed = df_processed.drop('LoanID', axis=1)

categorical_cols = ['Education', 'EmploymentType', 'MaritalStatus', 'HasMortgage', 'HasDependents', 'LoanPurpose', 'HasCoSigner']
df_processed = pd.get_dummies(df_processed, columns=categorical_cols)

X = df_processed.drop('Default', axis=1)
y = df_processed['Default']

X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

model_columns = list(X.columns)

print("Training Logistic Regression model...")
model = LogisticRegression(max_iter=1000, random_state=42)
model.fit(X_train, y_train)

print("Optimizing threshold for F1 score...")
y_probs = model.predict_proba(X_val)[:, 1]
precisions, recalls, thresholds = precision_recall_curve(y_val, y_probs)

f1_scores = (2 * precisions * recalls) / (precisions + recalls + 1e-10)
best_f1_idx = np.argmax(f1_scores)
best_threshold = thresholds[best_f1_idx]
best_f1 = f1_scores[best_f1_idx]

print(f"Best Threshold: {best_threshold:.4f} with F1: {best_f1:.4f}")

model.fit(X, y)

output_dir = os.path.join(os.path.dirname(__file__), "..", "my-app", "public")
os.makedirs(output_dir, exist_ok=True)
model_path = os.path.join(output_dir, "model.pkl")

print(f"Saving model to {model_path}...")
joblib.dump({
    "model": model, 
    "columns": model_columns, 
    "threshold": float(best_threshold)
}, model_path)
print("Logistic Regression training and serialization complete.")
