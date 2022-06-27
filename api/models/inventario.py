from django.db import models
from api.models import (
    Sucursal,
    Producto
)


class Inventario(models.Model):
    """
    Modelo de inventario
    """
    sucursal = models.ForeignKey(
        Sucursal,
        related_name="inventario",
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    producto = models.ForeignKey(
        Producto, 
        related_name="inventario",
        on_delete=models.CASCADE
    )
    existencias = models.FloatField(default=0)

    estado = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}) {} existencias: -{}-".format(
            self.id,
            self.producto.nombre,
            self.existencias
        )