from machine import Pin, SPI
from NRF24L01 import NRF24L01
import utime

# Initialize SPI and Pins
spi = SPI(1, baudrate=4000000, polarity=0, phase=0, sck=Pin(18), mosi=Pin(23), miso=Pin(19))
csn = Pin(5, Pin.OUT)  # CS pin
ce = Pin(4, Pin.OUT)   # CE pin

# Create NRF24L01 instance
nrf = NRF24L01(spi, csn, ce)

# Set the transmission and receiving addresses (5 bytes each)
tx_address = b'1Node'
rx_address = b'2node'
nrf.open_tx_pipe(tx_address)
nrf.open_rx_pipe(0, rx_address)
nrf.start_listening()

# Define vehicle state
plate = "KBH124H"
state = {
    "plate": plate,
    "dest": 'Kis',
    "E": 'T'
}

def send_message(data):
    """Stop listening, send message, and restart listening."""
    nrf.stop_listening()
    try:
        nrf.send(data.encode('utf-8'))
        print("Data sent successfully:", data)
    except OSError:
        print("Transmission failed!")
    nrf.start_listening()

def receive_message():
    """Receive and process incoming messages."""
    try:
        received_data = nrf.recv().decode('utf-8').strip('\x00')
        print("Received:", received_data)
        
        # Validate and update state if the received data matches the plate format
        if len(received_data) >= 11 and received_data[0:7] == plate:
            new_state = {
                'plate': received_data[0:7],
                'dest': received_data[7:10],
                "E": received_data[10:11]
            }
            print("Updated state:", new_state)
            return new_state
    except Exception as e:
        print("Failed to process received data:", e)
    return None

while True:
    # Check for incoming messages
    if nrf.any():
        updated_state = receive_message()
        if updated_state:
            state = updated_state

    # Prepare and send message if no incoming messages are present
    if not nrf.any():
        message = f"{state['plate']}{state['dest']}{state['E']}"
        
        # Ensure message fits NRF24L01's maximum payload size
        if len(message) <= 32:
            print("Sending:", message)
            send_message(message)
    
    # Delay to avoid flooding
    utime.sleep(1)

