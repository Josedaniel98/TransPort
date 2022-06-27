from django.db import models
from django.contrib.auth.models import User

from api.models import (
    Sucursal,
    Producto
)

# Constantes
from api.utils.tipoempresa import constante_empresa


class Movimiento(models.Model):
    """ Modelo de movimiento """
    fecha = models.DateTimeField(auto_now_add=True)
    producto = models.ForeignKey(
        Producto,
        related_name="movimiento",
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    total= models.FloatField(default=0)
    sucursal_origen = models.ForeignKey(
        Sucursal,
        related_name='movimiento_origen',
        on_delete=models.CASCADE
    )
    sucursal_destino = models.ForeignKey(
        Sucursal,
        related_name='movimiento_destino',
        on_delete=models.CASCADE
    )

    cliente = models.ForeignKey(
        User,
        related_name='movimiento',
        on_delete=models.CASCADE
    )

    tipo_empresa = models.PositiveSmallIntegerField(
        choices=constante_empresa.TIPO_EMPRESA,
        null=False,
    )

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    estado = models.BooleanField(default=True)
