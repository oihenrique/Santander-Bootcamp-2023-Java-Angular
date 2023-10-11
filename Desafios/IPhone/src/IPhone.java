public class IPhone extends Cellphone {

    @Override
    public void openPage() {
        System.out.println("Opening page.");
    }

    @Override
    public void newTab() {
        System.out.println("Opening new tab.");
    }

    @Override
    public void refreshPage() {
        System.out.println("Refreshing page.");
    }

    @Override
    public void power() {
        System.out.println("Start cellphone system.");
    }

    @Override
    public void powerOff() {
        System.out.println("Turning off cellphone.");
    }

    @Override
    public void makeCall() {
        System.out.println("making a call to...");
    }

    @Override
    public void answerCall() {
        System.out.println("Answering phone call from...");
    }

    @Override
    public void voiceMail() {
        System.out.println("Listening to voice mail.");
    }

    @Override
    public void play() {
        System.out.println("Playing music.");
    }

    @Override
    public void pause() {
        System.out.println("Pausing music.");
    }

    @Override
    public void selectMusic() {
        System.out.println("Select music...");
    }
}
