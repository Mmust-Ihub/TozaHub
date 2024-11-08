from machine import Pin, SPI
from NRF24L01 import NRF24L01
import utime
import urequests

# Initialize SPI and Pins
spi = SPI(1, baudrate=4000000, polarity=0, phase=0, sck=Pin(18), mosi=Pin(23), miso=Pin(19))
csn = Pin(5, Pin.OUT)  # CS pin
ce = Pin(4, Pin.OUT)   # CE pin

# Create NRF24L01 instance
nrf = NRF24L01(spi, csn, ce)

# Set the receiving and transmission addresses (5 bytes)
rx_address = b'1Node'  # Receiving address
tx_address = b'2node'  # Transmission address
nrf.open_rx_pipe(0, rx_address)
nrf.open_tx_pipe(tx_address)

# Constant messages
kak_address = 'KBT567UKak'
kak_confirm = (kak_address + 'T').encode('utf-8')
kak_done = (kak_address + 'F').encode('utf-8')

# Start listening for incoming messages
nrf.start_listening()
print('Started listening')

def postdata(plate):
    url = ""
    headers = {'Content-Type': 'text/plain'}
    r = requests.post(url, files = plate, headers=headers)
    print(r.status_code)
def connecttowifi():
    import network
    wifi = network.WLAN(network.STA_IF)
    wifi.active(True)
    while not wifi.isconnected():
        wifi.connect("Binary Brigades","304@NOT_MODIFIED")
        if wifi.isconnected:
            break
    print(f"Address {wifi.ifconfig()}")   
def send_message(message, retries=3):
    nrf.stop_listening()
    for attempt in range(retries):
        try:
            nrf.send(message)
            print("Sent message:", message.decode('utf-8'))
            break  # Break the loop if the send was successful
        except OSError:
            print(f"Transmission failed on attempt {attempt + 1}/{retries}. Retrying...")
            utime.sleep(0.1)  # Wait before retrying
    else:
        print("Error: Unable to send message after retries.")
    nrf.start_listening()
connecttowifi()
while True:
    if nrf.any():
        try:
            # Receive and decode the message
            received_data = nrf.recv().decode('utf-8').strip('\x00')
            print("Raw received data:", received_data)
            
            # Parse data into a dictionary
            data = {
                'plate': received_data[:7],
                'dest': received_data[7:10],
                'E': received_data[10:11]
            }
            print("Parsed data:", data)
            
            # Determine response based on 'dest' and 'E' status
            if data["dest"] == 'Kis':
                if data['E'] == 'T':
                    # Update 'E' to 'F' and send confirmation
                    data['E'] = 'F'
                    postdata(data['plate'])
                    message = data['plate'] + data['dest'] + data['E']
                    message = message.encode('utf-8')
                    send_message(message)
                    
                elif data['E'] == 'F':
                    data['dest'] = 'Kak'
                    message = data['plate'] + data['dest'] + data['E']
                    message = message.encode('utf-8')
                    send_message(message)

            elif data["dest"] == 'Kak':
                send_message(kak_confirm if data['E'] == 'F' else kak_done)

        except Exception as e:
            print('Error processing received data:', e)

    # Short delay to prevent CPU overuse
    utime.sleep(0.1)
