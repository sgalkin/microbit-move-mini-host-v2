function unplotVelocityValue (x: number, y: number) {
    led.unplot(x, y)
    led.unplot(x + 1, y)
}
function stop () {
    updateVelocity(0, 0)
}
input.onButtonPressed(Button.A, function () {
    updateVelocity(velocityLeft + 1, velocityRight + 1)
})
function updateVelocity (left: number, right: number) {
    velocityLeft = Math.constrain(left, -2, 2)
    velocityRight = Math.constrain(right, -2, 2)
    if (velocityLeft == 0 && velocityRight == 0) {
        kitronik_servo_lite.stop()
    } else {
        pins.servoWritePin(AnalogPin.P1, 90 - velocityStep * velocityLeft)
        pins.servoWritePin(AnalogPin.P2, 90 + velocityStep * velocityRight)
    }
    showVelocity()
}
function showVelocity () {
    plotVelocity(0, velocityLeft)
    plotVelocity(3, velocityRight)
}
function plotVelocity (offset: number, value: number) {
    plotVelocityValue(offset, 2)
    if (value >= 2) {
        plotVelocityValue(offset, 0)
    } else {
        unplotVelocityValue(offset, 0)
    }
    if (value >= 1) {
        plotVelocityValue(offset, 1)
    } else {
        unplotVelocityValue(offset, 1)
    }
    if (value <= -2) {
        plotVelocityValue(offset, 4)
    } else {
        unplotVelocityValue(offset, 4)
    }
    if (value <= -1) {
        plotVelocityValue(offset, 3)
    } else {
        unplotVelocityValue(offset, 3)
    }
}
function plotVelocityValue (x: number, y: number) {
    led.plot(x, y)
    led.plot(x + 1, y)
}
input.onButtonPressed(Button.AB, function () {
    stop()
    basic.showString("Halted!")
    showVelocity()
})
input.onButtonPressed(Button.B, function () {
    updateVelocity(velocityLeft - 1, velocityRight - 1)
})
let velocityRight = 0
let velocityLeft = 0
let velocityStep = 0
stop()
velocityStep = 45
kitronik_servo_lite.setDegreesPerSecond(400)
kitronik_servo_lite.setDistancePerSecond(280)
let strip = neopixel.create(DigitalPin.P0, 5, NeoPixelMode.RGB)
radio.setGroup(42)
