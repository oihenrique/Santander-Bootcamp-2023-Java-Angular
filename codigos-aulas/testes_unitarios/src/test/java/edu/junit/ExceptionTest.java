package edu.junit;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class ExceptionTest {
    @Test
    void validarCenarioDeExcecaoNaTransferencia() {
        Conta contaOrigem = new Conta("123456", 0);
        Conta contaDestino = new Conta("456548", 100);
        TransferenciaEntreContas transferenciaEntreContas = new TransferenciaEntreContas();
        Assertions.assertThrows(IllegalArgumentException.class, () ->
                transferenciaEntreContas.transferir(contaOrigem, contaDestino, -1));
    }
}