import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
            <span class="footer-text-left">
                <span>© 赤峰市市场与质量技术监督局 2015-2019</span>
            </span>
            <span class="footer-text-right">
                <span>技术支持:廊坊开发区世通科技有限公司</span>
            </span>
        </div>
    `,
})
export class AppFooterComponent {
}
