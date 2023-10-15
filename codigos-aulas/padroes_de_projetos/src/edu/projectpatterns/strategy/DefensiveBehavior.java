package edu.projectpatterns.strategy;

public class DefensiveBehavior implements Behavior {
    @Override
    public void move() {
        System.out.println("moving defensively...");
    }
}
