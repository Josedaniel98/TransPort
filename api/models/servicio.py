from django.db import models
from .sucursales import Sucursal

class Producto(models.Model):
    """Modelo de productos """

    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()

    precio_venta = models.FloatField(null=False, default=0)

    Sucursal = models.ForeignKey(
        Sucursal,
        on_delete=models.deletion.CASCADE,
        related_name="productos",
        null=True,
        blank=True
    )

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    estado = models.BooleanField(default=True)

    def __str__(self):
        """ retorna datos del servicio"""
        nombre_sucursal = ""
        if self.sucursal:
            self.sucursal.nombre
        return "id: {} nombre: {} sucursal: {}".format(
            self.pk,
            self.nombre,
            nombre_sucursal
        )

    def delete(self):
        self.estado = False
        self.save()
        return True
