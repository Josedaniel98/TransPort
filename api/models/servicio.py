from django.db import models
from .empresas import Empresas

class Producto(models.Model):
    """Modelo de productos """

    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()

    precio_venta = models.FloatField(null=False, default=0)

    empresa = models.ForeignKey(
        Empresas,
        on_delete=models.deletion.CASCADE,
        related_name="productos",
        null=True,
        blank=True
    )

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
