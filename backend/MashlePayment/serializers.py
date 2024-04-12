from rest_framework import serializers
from .models import PaymentDetail

class PaymentDetailSerializer(serializers.ModelSerializer):
    """Serializer for PaymentDetail model."""
    user = serializers.PrimaryKeyRelatedField(
        default=serializers.CurrentUserDefault(),
        read_only=True
    )
    class Meta:
        model = PaymentDetail
        fields = '__all__'
