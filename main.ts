let LEDValue = 0
let LEDString = ""
let motorValueLeft = 0
let motorValueRight = 0
let TankP1 = 0
let TankP0 = 0
let BLEString = ""
bluetooth.startUartService()
PCA9685.init(PCA9685.chipAddress("0x41"), 100)
let P0String = "1500"
let P1String = "1500"
let P2String = "1500"
let POValue = parseFloat(P0String)
let P1Value = parseFloat(P1String)
let P2Value = parseFloat(P2String)
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, 0, PCA9685.chipAddress("0x41"))
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, 0, PCA9685.chipAddress("0x41"))
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, 0, PCA9685.chipAddress("0x41"))
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED8, 0, PCA9685.chipAddress("0x41"))
pins.servoSetPulse(AnalogPin.P0, POValue)
pins.servoSetPulse(AnalogPin.P1, POValue)
pins.servoSetPulse(AnalogPin.P2, POValue)
basic.showLeds(`
    . . . . .
    . . . . .
    # . . . #
    . # . # .
    . . . . .
    `)
bluetooth.setTransmitPower(7)
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED9, 100, PCA9685.chipAddress("0x41"))
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED10, 100, PCA9685.chipAddress("0x41"))
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED11, 100, PCA9685.chipAddress("0x41"))
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED12, 100, PCA9685.chipAddress("0x41"))
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED13, 100, PCA9685.chipAddress("0x41"))
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED14, 100, PCA9685.chipAddress("0x41"))
basic.forever(function () {
    BLEString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
    if (BLEString.length == 19) {
        // servos.P0.setPulse(TankP0)
        // servos.P1.setPulse(TankP1)
        // servos.P2.setPulse(P2Value)
        if (BLEString.substr(0, 3) == "SRT") {
            P0String = BLEString.substr(3, 4)
            P1String = BLEString.substr(7, 4)
            P2String = BLEString.substr(11, 4)
            POValue = parseFloat(P0String)
            P1Value = parseFloat(P1String)
            P2Value = parseFloat(P2String)
            TankP0 = 1500
            TankP1 = 1500
            if (P1Value >= 1500) {
                TankP1 = TankP1 + (P1Value - 1500)
                TankP0 = TankP0 - (P1Value - 1500)
            } else {
                TankP1 = TankP1 - (1500 - P1Value)
                TankP0 = TankP0 + (1500 - P1Value)
            }
            if (POValue >= 1500) {
                TankP1 = TankP1 + (POValue - 1500)
                TankP0 = TankP0 + (POValue - 1500)
            } else {
                TankP1 = TankP1 - (1500 - POValue)
                TankP0 = TankP0 - (1500 - POValue)
            }
            BLEString = ""
            if (TankP0 > 1500) {
                motorValueRight = Math.map(TankP0, 1500, 2000, 0, 100)
                PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, 0, PCA9685.chipAddress("0x41"))
                PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, motorValueRight, PCA9685.chipAddress("0x41"))
            } else {
                motorValueRight = Math.map(TankP0, 1500, 1000, 0, 100)
                PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, motorValueRight, PCA9685.chipAddress("0x41"))
                PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, 0, PCA9685.chipAddress("0x41"))
            }
            if (TankP1 > 1500) {
                motorValueLeft = Math.map(TankP1, 1500, 2000, 0, 100)
                PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, 0, PCA9685.chipAddress("0x41"))
                PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED8, motorValueLeft, PCA9685.chipAddress("0x41"))
            } else {
                motorValueLeft = Math.map(TankP1, 1500, 1000, 0, 100)
                PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, motorValueLeft, PCA9685.chipAddress("0x41"))
                PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED8, 0, PCA9685.chipAddress("0x41"))
            }
            pins.servoSetPulse(AnalogPin.P0, TankP0)
            pins.servoSetPulse(AnalogPin.P1, TankP1)
            pins.servoSetPulse(AnalogPin.P2, P2Value)
        } else if (BLEString.substr(0, 3) == "LED") {
            // LED9 MAP to REAL LED1 R
            LEDString = BLEString.charAt(3)
            if (LEDString == "A") {
                LEDValue = 10
            } else if (LEDString == "B") {
                LEDValue = 11
            } else if (LEDString == "C") {
                LEDValue = 12
            } else if (LEDString == "D") {
                LEDValue = 13
            } else if (LEDString == "E") {
                LEDValue = 14
            } else if (LEDString == "F") {
                LEDValue = 15
            } else {
                LEDValue = parseFloat(LEDString)
            }
            LEDValue = Math.map(LEDValue, 0, 15, 100, 0)
            PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED9, LEDValue, PCA9685.chipAddress("0x41"))
            // LED9 MAP to REAL LED1 G
            LEDString = BLEString.charAt(4)
            if (LEDString == "A") {
                LEDValue = 10
            } else if (LEDString == "B") {
                LEDValue = 11
            } else if (LEDString == "C") {
                LEDValue = 12
            } else if (LEDString == "D") {
                LEDValue = 13
            } else if (LEDString == "E") {
                LEDValue = 14
            } else if (LEDString == "F") {
                LEDValue = 15
            } else {
                LEDValue = parseFloat(LEDString)
            }
            LEDValue = Math.map(LEDValue, 0, 15, 100, 0)
            PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED10, LEDValue, PCA9685.chipAddress("0x41"))
            // LED9 MAP to REAL LED1 B
            LEDString = BLEString.charAt(5)
            if (LEDString == "A") {
                LEDValue = 10
            } else if (LEDString == "B") {
                LEDValue = 11
            } else if (LEDString == "C") {
                LEDValue = 12
            } else if (LEDString == "D") {
                LEDValue = 13
            } else if (LEDString == "E") {
                LEDValue = 14
            } else if (LEDString == "F") {
                LEDValue = 15
            } else {
                LEDValue = parseFloat(LEDString)
            }
            LEDValue = Math.map(LEDValue, 0, 15, 100, 0)
            PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED11, LEDValue, PCA9685.chipAddress("0x41"))
            // LED9 MAP to REAL LED2 R
            LEDString = BLEString.charAt(7)
            if (LEDString == "A") {
                LEDValue = 10
            } else if (LEDString == "B") {
                LEDValue = 11
            } else if (LEDString == "C") {
                LEDValue = 12
            } else if (LEDString == "D") {
                LEDValue = 13
            } else if (LEDString == "E") {
                LEDValue = 14
            } else if (LEDString == "F") {
                LEDValue = 15
            } else {
                LEDValue = parseFloat(LEDString)
            }
            LEDValue = Math.map(LEDValue, 0, 15, 100, 0)
            PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED12, LEDValue, PCA9685.chipAddress("0x41"))
            // LED9 MAP to REAL LED2 G
            LEDString = BLEString.charAt(8)
            if (LEDString == "A") {
                LEDValue = 10
            } else if (LEDString == "B") {
                LEDValue = 11
            } else if (LEDString == "C") {
                LEDValue = 12
            } else if (LEDString == "D") {
                LEDValue = 13
            } else if (LEDString == "E") {
                LEDValue = 14
            } else if (LEDString == "F") {
                LEDValue = 15
            } else {
                LEDValue = parseFloat(LEDString)
            }
            LEDValue = Math.map(LEDValue, 0, 15, 100, 0)
            PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED13, LEDValue, PCA9685.chipAddress("0x41"))
            // LED9 MAP to REAL LED2 B
            LEDString = BLEString.charAt(9)
            if (LEDString == "A") {
                LEDValue = 10
            } else if (LEDString == "B") {
                LEDValue = 11
            } else if (LEDString == "C") {
                LEDValue = 12
            } else if (LEDString == "D") {
                LEDValue = 13
            } else if (LEDString == "E") {
                LEDValue = 14
            } else if (LEDString == "F") {
                LEDValue = 15
            } else {
                LEDValue = parseFloat(LEDString)
            }
            LEDValue = Math.map(LEDValue, 0, 15, 100, 0)
            PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED14, LEDValue, PCA9685.chipAddress("0x41"))
        } else {
        	
        }
    } else {
        bluetooth.uartWriteNumber(BLEString.length)
        BLEString = ""
    }
})
