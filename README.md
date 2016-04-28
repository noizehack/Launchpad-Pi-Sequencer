#Launchpad Pi Sequencer

##about the project:
This project is a sequencer for drums that is designed to be able to be used with just a Novation Launchpad as the interface, with no keyboard or mouse or screen. It can output midi, but is mainly for outputting triggers for modular synths or other drum machines with analog trigger inputs. It also has clock in and reset in as well as clock out. There is a switch for switching between the internal clock and the clock in jack. There is also a switch to save and shutdown.

It is designed to run on a Raspberry Pi with node.js and uses a Novation Launchpad. I built and tested this with a Raspberry Pi 3, and a Launchpad MK II, so if you are able to test this on a Raspberry Pi 2 or a different launchpad let me know if it works, it will probably not work with the original launchpad, and not with the launchpad mini in the current state, but should work with the pro version. I used Ubuntu Mate 15.10, and have not tested on other distros, so please let me know if you get it to work with others, or if it doesn't work.

##features:
* 8 tracks
* 64 steps per track
* independent sequence length per track
* 64 presets
* saves midi output settings
* built in clock
* can be clocked by external clock
* outputs 5v triggers midi(over usb)
* reset input

##hardware:
* Raspberry Pi 3
* Pi "Hat" with 9 inverting output buffers powered by 5v, 2 inverting input buffers powered by 3.3v and 2 switches with pull up resistors to 3.3v (I do not yet have schematics, but I will make some and add them to the repository soon, in the meantime you can use the buffer designs from the Sonic Potions LXR trigger IO board http://sonic-potions.com/public/Trigger_IO_schematic.pdf)
* Novation Launchpad Mark 2
* A USB to midi converter if you want to use midi, or a drum machine with USB midi in

##dependencies:
* node.js
* npm
* npm modules
  * onoff
  * nanotimer
  * easymidi
* nodejs-legacy (if you are using Debian or Ubuntu)
* libasound2-dev
* gcc
* python
* ALSA

##setup:
In order to get the sequencer to run when the Pi boots you can run

    sudo crontab -e
    
Then add this line to the file that comes up

    @reboot nodejs /path/to/app.js > /path/to/logFileName.log 2>&1
    
The repository comes with a default midiConfig.json for triggering Volca Beats on midi channel 1 and a blank preset.json file. These files can be edited while the main app is running and save when you shutdown the Pi with the shutdown switch, if you mess up these files you can run the makeConfig.js and makePresets.js to reset these JSON files.

##gpio pinout:
The trigger outputs and inputs are inverted, since inverting buffers work better than non-inverting buffers and it is easy to flip the logic in software. For the clock switch 0 selects external clock and 1 internal. For the power switch 1 selects power off.

#####trigger outputs:
* track 1: 18
* track 2: 4
* track 3: 17
* track 4: 23
* track 5: 25
* track 6: 5
* track 7: 13
* track 8: 21
* clock: 27

#####inputs:
* clock: 24
* reset: 16

#####switches:
* clock: 6
* power: 20

##instructions:
###Turning On
Just plug power into the Raspberry Pi's micro USB jack. The power off switch does not turn the device on, only off, but it is best to switch it to on before powering on the Pi. Make sure the launchpad is connected before you turn it on and any usb midi device if you want to send out midi.
###Turning Off
Flip the power switch to the off position. This saves the midi settings and the presets and then shuts down the Pi. Wait until the lights go off on the launchpad before you disconnect the power to the Pi. If you just yank the power you will loose your presets and midi settings and might corrupt your micro SD card.
###Step Editing
Push a pad to make that step trigger when the sequencer hits it, push the pad again to set it to not be triggered. The pad will light up to show that it will send a trigger.
###Track Switching
Each track has a unique color. The 8 round buttons on the right side of the launchpad are the track select buttons. They are lit with the color of the track and the currently selected track is brighter than the other 7.
###Start/Stop
The button on the top of the launchpad labeled "session" is the button to start and stop the sequencer running.
###Clock Selection
The clock switch selects between the internal BPM based clock and the external clock. In external mode the sequencer will advance one step for each clock rising edge trigger.
###Reset
The up arrow button on the top of the launchpad resets all of the sequencers back to step 0. The sequencer can also be reset by sending a trigger or gate into the reset jack.
###Change Number Of Tracks Displayed
The down arrow button on the top of the launchpad selects between 1, 2, 4, or 8 tracks displayed at a time. In single track display mode unlit pads are off, lit pads are on, and the sequence runner is the white pad. when multiple tracks are displayed off pads are dimmer color and on pads are brighter, and the sequence runner is still white. When multiple tracks are displayed you can choose which is the first track displayed by pushing its track select button.
###Scroll
The left and right arrow buttons on the top of the launchpad scroll through the pages of the sequences. The buttons light up with the same colors used for the track colors to give you an idea of which page you are on.
###BPM
The "user 1" button on the top of the launchpad is for changing the BPM(beats per minute) or speed of the sequencer internal clock. BPMs from 0.1 to 999.9 are possible. There are 4 "faders" on this page the left one is hundreds, then tens, then ones and then tenths. The fader goes from 0 to 9, each fader is a different color to help keep them seperate. The clock speed does not change until the clock is stopped and then restarted.
###Midi Output Settings
If you hold the "user 1" button for more than 1 second and then let go you will go into the mode where you can select what midi note and channel is sent out for each track. The track is selected with the track buttons on the right, the far left "fader" selects the midi channel from 1-16 and the next one is the hundreds, there is only one on/off button here, as the highest midi note is 127, then the tens and ones.
###Pattern Length
The "user 2" button on the top of the launchpad selects the mode where you can select which step is the last for that track. Just push on any step and that will become the last step for that track, each track has its own last step.
###Preset Loading
The "mixer" button on the top fo the launchpad goes into preset loading mode, press a pad and that preset will load.
###Preset Saving
If you hold the "mixer" button for more than 1 second and then let go you enter preset saving mode, when you push a pad the current track triggers and last steps will be saved into the preset.

##Todo or possible features to add:
* midi clock in / out
* swing
* 5 pin din midi interface
* have the power switch work for power on and off
* midi in to trigger out
* ability to plug in a launchpad or usb midi device after startup and have it be recognized
* use of multiple launchpads for longer sequences and/or more tracks
* compatibility with legacy launchpads(version 1 and mini)
* test with raspberry pi 2 and launchpad pro

##Know issues:
* if you plug a usb midi device in that draws a lot of power over usb the app might loose communication with the launchpad and will keep running, but you will not be able to edit patterns or interact with it.
* ~~Trigger pulses vary in width, which can make devices sensitive to this have different sounds on different triggers. Possible fixes are either a code optimization, or a different output buffer that always outputs a trigger with a specific width, no matter how long the input trigger is.~~ I think I fixed this by changing the triggers to all be turned off with one timer, instead of them each having their own individual timers.
