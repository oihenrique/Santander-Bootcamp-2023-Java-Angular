package edu.projectpatterns.facade;

import edu.cepsubsystem.CrmService;
import edu.crmsubsystem.CepApi;

public class Facade {

    public void migrateClient(String name, String cep) {
        String city = CepApi.getInstance().getCity(cep);
        String state = CepApi.getInstance().getState(cep);

        CrmService.saveClient(name, cep, city, state);
    }
}
