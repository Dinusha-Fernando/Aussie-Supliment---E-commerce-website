from rest_framework import serializers
from django.contrib.auth import get_user_model
from apps.accounts.models import Address

User = get_user_model()

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        read_only_fields = ('user', 'created_at')


class UserSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'phone', 'role', 'addresses', 'created_at')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password', 'phone', 'role')

    def validate_role(self, value):
        # Security: Prevent privilege escalation (OWASP API3 / Broken Access Control)
        # Normal public registration can only create RETAIL or WHOLESALE accounts.
        # ADMIN or STAFF roles can never be self-assigned.
        allowed_public_roles = [User.Role.RETAIL, User.Role.WHOLESALE]
        if value not in allowed_public_roles:
            return User.Role.RETAIL
        return value

    def create(self, validated_data):
        role = validated_data.get('role', User.Role.RETAIL)
        if role not in [User.Role.RETAIL, User.Role.WHOLESALE]:
            role = User.Role.RETAIL

        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone=validated_data.get('phone', ''),
            role=role,
            password=validated_data['password']
        )
        return user

