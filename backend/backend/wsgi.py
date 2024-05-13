import os
settings_module = 'backend.deployment' if 'WEBSITE_HOSTNAME' in os.environ else 'backend.settings'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)
from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
