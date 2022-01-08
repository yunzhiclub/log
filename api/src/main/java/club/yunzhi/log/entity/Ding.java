package club.yunzhi.log.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.core.entity.YunzhiEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Ding implements YunzhiEntity<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(Log.base.class)
    private Long id;

    public String webHook;
    public String secret;

    public Ding(String webHook, String secret){
        this.webHook = webHook;
        this.secret = secret;
    }

    public Ding() {}

    @Override
    public Long getId() {
        return null;
    }

    @Override
    public Boolean getDeleted() {
        return null;
    }
}
