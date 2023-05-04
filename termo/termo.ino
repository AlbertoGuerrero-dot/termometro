int counter = 0;
int LED = 13;
void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);

}

void loop() {
  digitalWrite(13, HIGH);
  delay(500);
  digitalWrite(13, LOW);
  delay(500);
  Serial.print(counter++, DEC);
  delay(1000);
}
