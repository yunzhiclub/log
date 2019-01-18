package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.service.ClientService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;


/**
 * @author panjie
 */
@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@Transactional
public class LogControllerTest {
    @Autowired private ClientService clientService;
    @Autowired
    private
    MockMvc mockMvc;


    @Test
    public void save() throws Exception {
        this.mockMvc
                .perform(MockMvcRequestBuilders.post("/log")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content("{}"))
                .andExpect(MockMvcResultMatchers.status().is(401));

        this.mockMvc
                .perform(MockMvcRequestBuilders.post("/log")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content("{}")
                        .param("token", "123456"))
                .andExpect(MockMvcResultMatchers.status().is(401));

        Client client = clientService.getOneSavedClient();
        this.mockMvc
                .perform(MockMvcRequestBuilders.post("/log")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content("{}")
                        .param("token", client.getToken()))
                .andExpect(MockMvcResultMatchers.status().is(200));
    }
}