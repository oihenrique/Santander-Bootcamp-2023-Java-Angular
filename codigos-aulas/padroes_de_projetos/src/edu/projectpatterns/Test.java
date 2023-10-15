package edu.projectpatterns;

import edu.projectpatterns.facade.Facade;
import edu.projectpatterns.singleton.SingletonEager;
import edu.projectpatterns.singleton.SingletonLazy;
import edu.projectpatterns.singleton.SingletonLazyHolder;
import edu.projectpatterns.strategy.*;

public class Test {
    public static void main(String[] args) {

        // Singleton
        SingletonLazy lazy = SingletonLazy.getInstance();
        System.out.println(lazy);
        lazy = SingletonLazy.getInstance();
        System.out.println(lazy);

        SingletonEager eager = SingletonEager.getInstance();
        System.out.println(eager);
        eager = SingletonEager.getInstance();
        System.out.println(eager);

        SingletonLazyHolder lazyHolder = SingletonLazyHolder.getInstance();
        System.out.println(lazyHolder);
        lazyHolder = SingletonLazyHolder.getInstance();
        System.out.println(lazyHolder);

        // Strategy
        Behavior defensive = new DefensiveBehavior();
        Behavior normal = new NormalBehavior();
        Behavior agressive = new AgressiveBehavior();

        Robot robo = new Robot();
        robo.setBehavior(normal);
        robo.move();
        robo.move();
        robo.setBehavior(defensive);
        robo.move();
        robo.setBehavior(agressive);
        robo.move();
        robo.move();
        robo.move();

        // Facade
        Facade facade = new Facade();
        facade.migrateClient("Henri", "58426588");
    }
}
