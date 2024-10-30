from django.db import models

# Create your models here.
class Price(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places = 2, default = 50.00)
    
    def __str__(self):
        return f"Current Price is {self.amount}"