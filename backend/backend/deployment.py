import os

from .settings import *

from .settings import BASE_DIR

ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']]
DEBUG = False
SECRET_KEY = os.environ['MY_SECRET_KEY']


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    'https://www.chi-kara.tech',
    'https://delightful-island-0e566b303.5.azurestaticapps.net',
]

CORS_ORIGIN_WHITELIST = [
    'https://www.chi-kara.tech',
    'https://delightful-island-0e566b303.5.azurestaticapps.net',
]
CSRF_TRUSTED_ORIGINS = [
    'https://www.chi-kara.tech',
    'https://delightful-island-0e566b303.5.azurestaticapps.net',
    ]


STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    }
}


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.environ['AZURE_MYSQL_NAME'],
        "HOST": os.environ['AZURE_MYSQL_HOST'],
        "USER": os.environ['AZURE_MYSQL_USER'],
        "PASSWORD": os.environ['AZURE_MYSQL_PASSWORD'],
    }
}

STATIC_ROOT = BASE_DIR/'staticfiles'