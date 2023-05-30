from rest_framework import serializers
from .models import Ratting


class RattingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratting
        fields = "__all__"




