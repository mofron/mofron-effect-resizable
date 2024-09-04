/**
 * @file mofron-effect-resizable/index.js
 * @brief resizable effect module for mofron component
 * @license MIT
 */
const Drag = require('mofron-event-drag');
const MouseUp = require('mofron-event-mouseup');
const ResizeCur = require('mofron-event-resizecur');
const ConfArg = mofron.class.ConfArg;
const comutl  = mofron.util.common;

module.exports = class extends mofron.class.Effect {
    /**
     * initialize effect
     * 
     * @param (mixed) 
     *                key-value: effect config
     * @short
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("Resizable");

            /* init config */
            this.confmng().add('status', { type:'string' });

	    if (0 < arguments.length) {
                this.config(p1);
	    }

            let thisobj = this;
            mofron.window.event([
                new Drag((d1,d2,d3) => { thisobj.drag(d1,d2,thisobj); }),
                new MouseUp(() => { thisobj.status('none'); })
            ]);

        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    component (prm) {
        try {
	    if (undefined !== prm) {
                prm.event(
		    new ResizeCur({
		        listener: new ConfArg(this.resizeCursor,this),
			offset:10, tag: this.id()
                    })
		);
	    }
            return super.component(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    resizeCursor (r1,r2,r3) {
        try {
	    if ('default' !== r2) {
	        r3.status('cursor');
            } else {
                r3.status('none');
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    
    drag (d1,d2,d3) {
        try {
            if ((true === this.suspend()) || ('none' === this.status())) {
                return;
            }
            this.status('resize');
            let res_cur  = this.component().event({ modname:'Resizecur', tag:this.id() });
            let m_pos    = res_cur.mousePos();
	    let comp_pos = {
                'top': comutl.getsize(this.component().style('top')).toPixel(),
		'left': comutl.getsize(this.component().style('left')).toPixel()
	    }
	    let comp_siz = {
                'width': comutl.getsize(this.component().width()).toPixel(),
		'height':comutl.getsize(this.component().height()).toPixel()
	    }

	    if ('right' === m_pos.side) {
                this.component().width((d2.pageX -comp_pos.left) +'px');
	    } else if ('left' === m_pos.side) {
                this.component().width(((comp_pos.left+comp_siz.width)-d2.pageX)+'px');
		this.component().style({ 'left':d2.pageX+'px' });
	    }
	    if ('bottom' === m_pos.vert) {
                this.component().height((d2.pageY-comp_pos.top) +'px');
	    } else if ('top' === m_pos.vert) {
                this.component().height(((comp_pos.top+comp_siz.height)-d2.pageY)+'px');
		this.component().style({ 'top':d2.pageY+'px' });
	    }


        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
 
    resize (w1,w2,w3) {
        try {
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    status (prm) {
        try {
            return this.confmng('status', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    suspend (prm) {
        try {
            if (true === prm) {
                this.component().event({ modname:'Resizecur', tag:this.id() }).disableCursor();
            } else if (false === prm) {
                this.component().event({ modname:'Resizecur', tag:this.id() }).enableCursor();
	    }
            return super.suspend(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
