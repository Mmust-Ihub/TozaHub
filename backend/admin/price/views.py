from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import (IsAuthenticated, AllowAny)
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from .models import Price
from .serializers import PriceSerializer
import jwt

# Create your views here.

class LoginView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(username=username, password=password)
        if user:
            # Generate JWT token
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                # 'role': user.role,  # Assuming your user model has a `role` field
            }, status=status.HTTP_200_OK)
        else:
            try:
                # Check if the user exists but the password is wrong
                User.objects.get(username=username)
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            except User.DoesNotExist:
                # Auto-register the user if they don't exist
                new_user = User.objects.create_user(username=username, password=password)
                refresh = RefreshToken.for_user(new_user)
                return Response({
                    'message': 'User registered successfully.',
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'role': new_user.role if hasattr(new_user, 'role') else 'user',  # Default role to 'user' if not present
                }, status=status.HTTP_201_CREATED)

        

# check if user has admin role

def is_admin(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return False
    
    token = auth_header.split()[1]
    decoded_token = AccessToken(token)
    return decoded_token.get('role') == 'admin'



@api_view(['PUT'])
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


@api_view(['GET'])
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
        