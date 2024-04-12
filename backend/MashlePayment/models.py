from django.db import models
from django.contrib.auth.models import User

class PaymentDetail(models.Model):
    """User's payment details."""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    address_line1 = models.CharField(max_length=255, verbose_name="Address Line 1")
    address_line2 = models.CharField(max_length=255, blank=True, verbose_name="Address Line 2")
    city = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20, verbose_name="Phone Number")

    class Meta:
        verbose_name_plural = "Payment Details"

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
