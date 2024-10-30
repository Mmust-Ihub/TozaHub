from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from django.contrib.auth import authenticate

from rest_framework_simplejwt.tokens import RefreshToken

from .models import Price
from .serializers import PriceSerializer
import jwt

# Create your views here.


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': user.role,  # Assuming user model has a `role` field
        })
    else:
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    

# check if user has admin role
def is_admin(request):
    token = request.headers.get('Authorization').split()[1]
    decrypt_token = jwt.decode(token, options = {"verify_signature": False})
    return decrypt_token.get('role') == 'admin'


@api_view('PUT')
@permission_classes([IsAuthenticated])
def update_price(request):
    if not is_admin(request):
        return Response({"detaail" : "User not authorized"}, status = status.HTTP_403_FORBIDDEN)

    try:
        price = Price.objects.first()
        if not price:
            price = Price.objects.create()
            
        serializer = PriceSerializer(price, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view('GET')
@permission_classes([IsAuthenticated])
def get_price(request):
    try:
        price = Price.objects.first()     
        if not price:
            return Response({"detail": "There was no price found"}, status = status.HTTP_404_NOT_FOUND)

        serializer = PriceSerializer(price)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        