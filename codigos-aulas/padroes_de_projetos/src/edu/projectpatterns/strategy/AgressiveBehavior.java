package edu.projectpatterns.strategy;

public class AgressiveBehavior implements Behavior {
    @Override
    public void move() {
        System.out.println("Moving aggressively...");
    }
}
