package club.yunzhi.log.utils;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Iterator;
import java.util.List;
import java.util.function.Function;

/**
 * 装饰器模式重新装饰
 */
public class PageImpl implements org.springframework.data.domain.Page {
    private org.springframework.data.domain.Page page;
    public PageImpl(org.springframework.data.domain.Page page) {
        this.page = page;
    }


    @Override
    @JsonView(base.class)
    public int getTotalPages() {
        return this.page.getTotalPages();
    }

    @Override
    @JsonView(base.class)
    public long getTotalElements() {
        return this.page.getTotalElements();
    }

    @Override
    @JsonView(base.class)
    public org.springframework.data.domain.Page map(Function function) {
        return this.page.map(function);
    }

    @Override
    @JsonView(base.class)
    public int getNumber() {
        return this.page.getNumber();
    }

    @Override
    @JsonView(base.class)
    public int getSize() {
        return this.page.getSize();
    }

    @Override
    @JsonView(base.class)
    public int getNumberOfElements() {
        return this.page.getNumberOfElements();
    }

    @Override
    @JsonView(base.class)
    public List getContent() {
        return this.page.getContent();
    }

    @Override
    @JsonView(base.class)
    public boolean hasContent() {
        return this.page.hasContent();
    }

    @Override
    @JsonView(base.class)
    public Sort getSort() {
        return this.page.getSort();
    }

    @Override
    @JsonView(base.class)
    public boolean isFirst() {
        return this.page.isFirst();
    }

    @Override
    @JsonView(base.class)
    public boolean isLast() {
        return this.page.isLast();
    }

    @Override
    @JsonView(base.class)
    public boolean hasNext() {
        return this.page.hasNext();
    }

    @Override
    @JsonView(base.class)
    public boolean hasPrevious() {
        return this.page.hasPrevious();
    }

    @Override
    @JsonView(base.class)
    public Pageable nextPageable() {
        return this.page.nextPageable();
    }

    @Override
    @JsonView(base.class)
    public Pageable previousPageable() {
        return this.page.previousPageable();
    }

    @Override
    public Iterator iterator() {
        return this.page.iterator();
    }

    public interface base {}
}
