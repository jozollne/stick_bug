import time
import serial
import os
import socketio

s = serial.Serial('/dev/ttyACM0', 9600)

if not s.isOpen():
    s.open()

time.sleep(5)

sio = socketio.Client()
sio.connect('http://192.168.10.254:3000')

try:
    while True:
        response_bytes = s.readline()
        response = response_bytes.decode('utf-8').strip()
        
        values = response.split()
        
        if len(values) == 3 and all(val.isnumeric() for val in values):
            x_data, y_data, sw_data = map(int, values)
            os.system('clear')

            print(x_data, y_data, sw_data)
            
            data = {
                'x_data': x_data,
                'y_data': y_data,
                'sw_data': sw_data
            }
            sio.emit('joystick-data', data)

except KeyboardInterrupt:
    print("\nProgramm wurde beendet.")
finally:
    sio.disconnect()
    s.close()
