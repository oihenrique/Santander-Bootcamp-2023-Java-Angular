package edu.rhselect.candidates;

import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public class SelectionProcess {
    public static void main(String[] args) {
        printSelected();
    }

    static void selectCandidates() {
        String[] candidates = {"FELIPE", "MARCIA", "JULIA", "PAULO", "AUGUSTO", "MONICA", "FABRICIO", "MIRELA", "DANIELA", "JORGE"};

        int selectedCandidates = 0;
        int currentCandidate = 0;
        double baseSalary = 2000.0;
        while (selectedCandidates < 5 && currentCandidate < candidates.length) {
            String candidate = candidates[currentCandidate];
            double desiredSalary = desiredValue();
            System.out.println("Candidate " + candidate + " requested this salary: " + desiredSalary);

            if (baseSalary >= desiredSalary) {
                System.out.println("Candidate " + candidate + " has been selected for the position.");
                selectedCandidates++;
            }
            currentCandidate++;
        }
    }

    static void printSelected() {
        String[] candidates = {"FELIPE", "MARCIA", "JULIA", "PAULO", "AUGUSTO"};
        System.out.println("Printing the list of candidates, indicating the index of each element.");
        for (int index = 0; index < candidates.length; index++) {
            System.out.println("Candidate number " + (index + 1) + " is " + candidates[index]);
        }

        System.out.println("Shortened form of 'for each' iteration.");

        for (String candidate : candidates) {
            System.out.println("O candidato selecionado foi " + candidate);
        }
    }

    static double desiredValue() {
        return ThreadLocalRandom.current().nextDouble(1800, 2200);
    }


    static void analyzeCandidate(double desiredSalary) {
        double baseSalary = 2000.0;
        if (baseSalary > desiredSalary) {
            System.out.println("CALL THE CANDIDATE");
        } else if (baseSalary == desiredSalary) {
            System.out.println("CALL THE CANDIDATE WITH A COUNTER OFFER");
        } else {
            System.out.println("WAITING FOR THE RESULTS OF OTHER CANDIDATES");
        }
    }

    static void contactCandidate(String candidate) {
        int attemptsMade = 1;
        boolean keepTrying = true;
        boolean answered = false;

        do {
            answered = answerCall();
            keepTrying = !answered;
            if (keepTrying)
                attemptsMade++;
            else
                System.out.println("SUCCESSFULLY MADE CONTACT");
        } while (keepTrying && attemptsMade < 3);

        if (answered) {
            System.out.println("SUCCESSFULLY CONTACTED " + candidate + " ON ATTEMPT NUMBER " + attemptsMade);
        } else {
            System.out.println("COULD NOT CONTACT " + candidate + ", MAXIMUM NUMBER OF ATTEMPTS REACHED: " + attemptsMade);
        }
    }

    // Auxiliary method
    static boolean answerCall() {
        return new Random().nextInt(3) == 1;
    }

}
