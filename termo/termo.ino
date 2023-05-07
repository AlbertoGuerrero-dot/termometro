const int analogPin = A0;     // Pin analógico utilizado para leer el valor del termistor
const int B = 3975;           // Valor B del termistor
const int seriesResistor = 10000;   // Valor de la resistencia en serie utilizada con el termistor
int temp;                     // Variable para almacenar la temperatura

void setup() {
  Serial.begin(9600);        // Inicia la comunicación serial a 9600 baudios
}

void loop() {
  int reading = analogRead(analogPin);      // Lee el valor analógico del termistor
  float resistance = seriesResistor / ((1023 / (float)reading) - 1);  // Calcula la resistencia del termistor
  float temperature = 1 / ((log(resistance / seriesResistor) / B) + (1 / 298.15)) - 273.15;  // Calcula la temperatura en grados Celsius
  temp = (int)temperature;    // Convierte la temperatura a un entero
  //Serial.print("Temperatura: ");     // Imprime el mensaje de temperatura en la conexión serial
  Serial.print(temp);
  //Serial.println(" grados Celsius");
  Serial.print('\n');
  delay(2500);                // Espera un segundo antes de leer la temperatura nuevamente
}