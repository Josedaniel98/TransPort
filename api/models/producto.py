from django.db import models
from .sucursal import Sucursal
from .TipoProducto import TipoProducto


class Producto(models.Model):
    """Modelo de productos """

    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    codigo = models.CharField(max_length=50)

    precio_venta = models.FloatField(null=False, default=0)

    sucursal = models.ForeignKey(
        Sucursal,
        on_delete=models.deletion.CASCADE,
        related_name="productos",
        null=True,
        blank=True
    )

    tipo_producto = models.ForeignKey(
        TipoProducto,
        on_delete=models.deletion.CASCADE,
        related_name="productos"
    )

    materia_prima = models.BooleanField(default=False)

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    estado = models.BooleanField(default=True)

    def __str__(self):
        """ retorna datos del producto"""
        nombre_empresa = ""
        if self.empresa:
            self.empresa.nombre
        return "id: {} nombre: {} empresa: {}".format(
            self.pk,
            self.nombre,
            nombre_empresa
        )

    def delete(self):
        self.estado = False
        self.save()
        return True
