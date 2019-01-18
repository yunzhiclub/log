package club.yunzhi.log.exceptionHandler;

import club.yunzhi.log.exception.AuthException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;

/**
 * @author panjie
 */
@RestController // 以rest形式返回异常信息
@ControllerAdvice   // 全局异常处理器
public class GlobalExceptionHandler {
    @ExceptionHandler(value = {AuthException.class})
    public ResponseEntity<JsonErrorResult> associateDeleteExceptionHandler(HttpServletRequest httpServletRequest, Exception exception) {
        return new ResponseEntity<>(new JsonErrorResult(httpServletRequest, exception), HttpStatus.UNAUTHORIZED);
    }

    public static class JsonErrorResult implements Serializable {
        private String message;
        private String method;
        private String url;

        public JsonErrorResult() {
        }

        public JsonErrorResult(HttpServletRequest httpServletRequest, Exception exception) {
            this.setMethod(httpServletRequest.getMethod());
            this.setUrl(httpServletRequest.getRequestURL().toString());
            this.setMessage(exception.getMessage());
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getMethod() {
            return method;
        }

        public void setMethod(String method) {
            this.method = method;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }
}
