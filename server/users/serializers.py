from rest_framework import serializers
# from .models import User

from django.contrib.auth import get_user_model
User = get_user_model()


# from django.contrib.auth.models import User


# from .models import User
#
# class UserSerializer(UserCreateSerializer):
#     class Meta(UserCreateSerializer.Meta):
#         model = User
#         fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'
        write_only_fields = ('password')

    # def create(self, validated_data):
    #     password = validated_data.pop('password', None)
    #     instance = self.Meta.model(**validated_data)
    #     if password is not None:
    #         instance.set_password(password)
    #     instance.save()
    #     return instance
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user
    #
    # def update(self, instance, validated_data):
    #     for attr, value in validated_data.items():
    #         if attr == 'password':
    #             instance.set_password(value)
    #         else:
    #             setattr(instance, attr, value)
    #     instance.save()
    #     return instance


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            "first_name",
            "last_name",
            "email",
            "image",
            "phone",
            "gender",
            "date_of_birth",
            "city",
            "zipcode",
            "address",
            'is_staff',
            'is_superuser',
        ]
