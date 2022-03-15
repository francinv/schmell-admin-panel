web: gunicorn adminpanel.wsgi:application --preload --log-file -
worker: celery -A adminpanel worker -l info
beat: celery -A adminpanel beat 
