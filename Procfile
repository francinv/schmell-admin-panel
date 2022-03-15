web: gunicorn adminpanel.wsgi:application --preload --log-file -
worker: celery -A adminpanel worker -events -loglevel info 
beat: celery -A adminpanel beat 