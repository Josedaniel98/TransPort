from django.db import models
from api.utils.departamentos import constantes_departamentos
from api.utils.tipoempresa.constante_empresa import TIPO_EMPRESA

class Sucursal(models.Model):
    """Modelo de sucursales """

    nombre = models.CharField(max_length=255)
    departamento = models.PositiveSmallIntegerField(
        choices=constantes_departamentos.DEPARTAMENTOS_NUM,
        null=False,
    )

    # PLANTAS_EXTRACCION = 10
    # PLANTAS_MATERIA_PRIMA = 20
    # VENTA_ALQUILER_MAQUINARIA = 30
    # TRANSPORTE_MATERIA_PRIMA = 40
    # TRANSPORTE_PRODUCTOS = 50
    # SERVICIOS_CONSTRUCCION=60  

    # TIPO_EMPRESA = (
    #     (PLANTAS_EXTRACCION, 'Plantas de extracción minera'),
    #     (PLANTAS_MATERIA_PRIMA, 'Plantas de proceso de materia prima'),
    #     (VENTA_ALQUILER_MAQUINARIA, 'Venta y alquiler de maquinaria de contrucción'),
    #     (TRANSPORTE_MATERIA_PRIMA, 'Transporte de materia prima'),
    #     (TRANSPORTE_PRODUCTOS, 'Transporte de productos para empresas extranjeras y nacionales'),
    #     (SERVICIOS_CONSTRUCCION, 'Servicios de contrucción en general') 
    # )
    tipo_empresa = models.IntegerField(
        choices=TIPO_EMPRESA,
        null=False
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
