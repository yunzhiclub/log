package club.yunzhi.log;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAsync			// 启用异步
@EnableScheduling		// 启用定时任务
public class LogApplication {

	public static void main(String[] args) {
		SpringApplication.run(LogApplication.class, args);
	}

}

