@echo off
REM Activate the virtual environment
call venv\Scripts\activate

REM Set environment variables
set FLASK_APP=app.py
set FLASK_ENV=development

REM Run the Flask app
echo Starting Flask server...
flask run

REM Deactivate the virtual environment after the server stops
REM deactivate
