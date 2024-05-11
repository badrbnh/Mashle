import os
from django.http import Http404
import stripe
from dotenv import load_dotenv
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .serializers import PaymentDetailSerializer
from .models import PaymentDetail
from MashleAPI.models import CartItems
from django.views.decorators.csrf import csrf_exempt

load_dotenv()

STRIPE_PUBLIC_KEY = os.environ.get("STRIPE_PUBLIC_KEY")
STRIPE_SECRET_KEY = os.environ.get("STRIPE_SECRET_KEY")
SITE_URL = os.environ.get("SITE_URL")

class PersonalDetailsView(APIView):
    """API view for user's personal details."""
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, format=None):
        payment_details = PaymentDetail.objects.all()
        serializer = PaymentDetailSerializer(payment_details, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PaymentDetailSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.validated_data['user'] = request.user
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SinglePersonalDetailView(APIView):
    """API view for user's personal details by ID."""
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_object(self, pk):
        try:
            return PaymentDetail.objects.get(pk=pk)
        except PaymentDetail.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        personal_detail = self.get_object(pk)
        serializer = PaymentDetailSerializer(personal_detail)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        personal_detail = self.get_object(pk)
        serializer = PaymentDetailSerializer(personal_detail, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        personal_detail = self.get_object(pk)
        personal_detail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CurrentPersonalDetailsView(APIView):
    """API view for current user's personal details."""
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        current_user = request.user
        # Filter payment details for the current user
        payment_details = PaymentDetail.objects.filter(user=current_user)
        serializer = PaymentDetailSerializer(payment_details, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PaymentDetailSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.validated_data['user'] = request.user
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CurrentPersonalDetailView(APIView):
    """API view for current user's personal details by ID."""
    permission_classes = [IsAuthenticated]

    def get_object(self, request, pk):
        current_user = request.user
        try:
            return PaymentDetail.objects.get(pk=pk, user=current_user)
        except PaymentDetail.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        personal_detail = self.get_object(request, pk)
        serializer = PaymentDetailSerializer(personal_detail)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        personal_detail = self.get_object(request, pk)
        serializer = PaymentDetailSerializer(personal_detail, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        personal_detail = self.get_object(request, pk)
        personal_detail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


stripe.api_key = STRIPE_SECRET_KEY

class StripeCheckoutView(APIView):
    def post(self, request):
        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                            {
                            "price_data": {
                                "currency": "usd",
                                "product_data": {"name": 'pizza' },
                                "unit_amount": 2000,
                                "tax_behavior": "exclusive",
                            },
                            "adjustable_quantity": {"enabled": True, "minimum": 1, "maximum": 10},
                            "quantity": 1,
                            },
                ],
                
                payment_method_types=['card'],
                mode='payment',
                success_url=SITE_URL + '/?success=true&session_id={CHECKOUT_SESSION_ID}',
                cancel_url=SITE_URL + '/?canceled=true',
            )
            response =  redirect(checkout_session.url)
            return response
            
        except:
            return Response({'error': 'somthing went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
