""" role view """
#REST Framework
from rest_framework import status, filters, viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
#models
from api.models.roles import RolesModel
from django.db.models import Q
#serializers
from api.serializers.role import (
    RolesSerializer,
    RolesReadSerializer
)


class RoleViewSet(viewsets.ModelViewSet):
    """ viewset de roles """

    queryset = RolesModel.objects.filter(estado=True).order_by('nombre')

    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    )
    filter_fields = ("nombre", "descripcion")
    search_fields = ("nombre", "descripcion")
    ordering_fields = ("nombre",)

    def get_serializer_class(self):
        """ define el serializer para roles """
        if self.action in ['list', 'retrieve']:
            return RolesReadSerializer
        else:
            return RolesSerializer

    def perform_destroy(self, instance):
        """ eliminacion de los roles """
        instance.estado = False
        instance.save()
        usuario = self.request.user

    def perform_create(self, serializer):
        instance = serializer.save()
        usuario = self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        role = serializer.save()

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    @action( detail=False, methods=["get"])
    def selectroles(self, request, *args, **kwargs):
        """ listado de roles para un select """
        info = RolesModel.objects.filter(estado=True)
        inforoles = {
            'role': RolesReadSerializer(info, many=True).data,
        }
        
        return Response(inforoles, status=status.HTTP_200_OK)