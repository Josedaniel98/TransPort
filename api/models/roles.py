""" roles model """
from django.db import models


class RolesModel(models.Model):
    """ modelo de roles de usuario """

    nombre = models.CharField(max_length=25, null=False, blank=False)
    descripcion = models.TextField(null=False, blank=False)
    estado = models.BooleanField(default=True)

    planta_extraccion = models.BooleanField(default=False)
    planta_proceso = models.BooleanField(default=False)
    venta_alquiler = models.BooleanField(default=False)
    transporte_materia_prima = models.BooleanField(default=False)
    transporte_productos = models.BooleanField(default=False)
    servicios_construccion = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    cliente = models.BooleanField(default=False)


    def __str__(self):
        """ return el role """
        return self.nombre