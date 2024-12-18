"use strict";
var e = require("path"),
    t = require("fs"),
    n = require("puppeteer"),
    Marked = require("marked").Marked,
    i = require("cheerio");
var markedSmartypants = require("marked-smartypants").markedSmartypants;
var markedHighlight = require("marked-highlight").markedHighlight;
var hljs = require("highlight.js");
var extendedTables = require("marked-extended-tables");

var marked = new Marked();
marked.use(
    markedHighlight({
        langPrefix: "hljs language-",
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language }).value;
        },
    }),
);
marked.use(markedSmartypants({ config: "1" }));
marked.use(extendedTables());

const s = async e => marked.parse(e),
    o = async ({
        inputText: r,
        inputFilename: o,
        mdText: l,
        mdFile: c,
        outputFilename: d,
        type: m = "png",
        width: p = 800,
        height: u = 600,
        encoding: h = "binary",
        quality: w = 100,
        htmlText: g,
        cssText: y,
        htmlTemplate: f = "default",
        cssTemplate: $ = "default",
        log: b = !1,
        puppeteerProps: v = {},
    }) => {
        const S = ["jpeg", "png", "webp"],
            T = ["base64", "binary", "blob"],
            _ = { html: "", data: "base64" === h ? "" : Uint8Array.from([]), path: void 0 };
        let E = "";
        const x = o || c,
            F = r || l;
        if (x) {
            const n = e.resolve(x);
            if (!t.existsSync(n)) throw new Error(`Error: input file ${n} is not exists.\n`);
            if (!t.statSync(n).isFile()) throw new Error("Error: input is not a file.\n");
            (E = t.readFileSync(n).toString()),
                b && process.stderr.write(`Start to convert ${n} to an image.\n`);
        } else {
            if (!F) throw new Error("Error: text or file is required to be converted.\n");
            E = F;
        }
        const q = h,
            H = "binary" === q;
        if (!T.includes(q))
            throw new Error(
                `Error: encoding type ${q} is not supported. Valid types: ${T.join(", ")}.\n`,
            );
        let M = m;
        if (!S.includes(M))
            throw new Error(
                `Error: output file type ${M} is not supported. Valid types: ${S.join(", ")}.\n`,
            );
        let U,
            k = "";
        if (H)
            if (d) {
                const t = e.basename(d),
                    n = e.dirname(d),
                    r = t.split("."),
                    i = r.length;
                if (i <= 1) k = e.resolve(n, `${t}.${M}`);
                else {
                    const s = r[i - 1];
                    S.includes(s)
                        ? ((M = s), (k = e.resolve(d)))
                        : (b &&
                              process.stderr.write(
                                  `Warning: output file type must be one of 'jpeg', 'png' or 'webp'. Use '${M}' type.\n`,
                              ),
                          (k = e.resolve(n, `${t}.${M}`)));
                }
            } else
                k = e.resolve(
                    "mdimg_output",
                    (function (e) {
                        const t = new Date();
                        return `mdimg_${t.getFullYear()}_${t.getMonth() + 1}_${t.getDate()}_${t.getHours()}_${t.getMinutes()}_${t.getSeconds()}_${t.getMilliseconds()}.${e}`;
                    })(M),
                );
        "png" !== M && (U = w > 0 && w <= 100 ? w : 100);
        const j = (({
            inputHtml: n,
            htmlText: r,
            cssText: s,
            htmlTemplate: o,
            cssTemplate: a,
            log: l,
        }) => {
            let c = r,
                d = s;
            if (!c) {
                let n = e.resolve(__dirname, "../template/html", `${o}.html`);
                try {
                    t.accessSync(n, t.constants.R_OK);
                } catch (t) {
                    l &&
                        process.stderr.write(
                            `Warning: HTML template ${n} is not found or unreadable. Use default HTML template.\n${t}\n`,
                        ),
                        (n = e.resolve(__dirname, "../template/html/default.html"));
                }
                c = t.readFileSync(n).toString();
            }
            if (!d) {
                let n = e.resolve(__dirname, "../template/css", `${a}.css`);
                try {
                    t.accessSync(n, t.constants.R_OK);
                } catch (t) {
                    l &&
                        process.stderr.write(
                            `Warning: CSS template ${n} is not found or unreadable. Use default CSS template.\n${t}\n`,
                        ),
                        (n = e.resolve(__dirname, "../template/css/default.css"));
                }
                d = t.readFileSync(n).toString();
            }
            const m = i.load(c);
            return (
                m(".markdown-body").html(n),
                `\n  <!DOCTYPE html>\n  <html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>mdimg</title>\n    <style>\n      ${d}\n    </style>\n  </head>\n  <body>\n    ${m.html()}\n  </body>\n  </html>`
            );
        })({
            inputHtml: await s(E),
            htmlText: g,
            cssText: y,
            htmlTemplate: a(f),
            cssTemplate: a($),
            log: b,
        });
        _.html = j;
        const C = await n.launch({
                defaultViewport: { width: p, height: u },
                args: [`--window-size=${p},${u}`],
                ...v,
            }),
            L = await C.newPage();
        await L.setContent(j, { waitUntil: "networkidle0" });
        const D = await L.$("#mdimg-body");
        if (D) {
            if ("binary" === q || "blob" === q) {
                H &&
                    (function (n) {
                        const r = e.dirname(n);
                        try {
                            t.mkdirSync(r, { recursive: !0 }), t.writeFileSync(n, "");
                        } catch (e) {
                            throw new Error(`Error: create new file ${n} failed.\n${String(e)}\n`);
                        }
                    })(k);
                const n = await D.screenshot({
                    path: H ? k : void 0,
                    type: M,
                    quality: U,
                    encoding: "binary",
                });
                b &&
                    process.stderr.write(
                        `Info: convert to image${H ? ` and saved as ${k}` : ""} successfully!\n`,
                    ),
                    (_.data = n),
                    (_.path = H ? k : void 0);
            } else if ("base64" === q) {
                const e = await D.screenshot({ type: M, quality: U, encoding: "base64" });
                b && process.stderr.write("Info: convert to BASE64 encoded string successfully!\n"),
                    (_.data = e);
            }
            return await C.close(), _;
        }
        throw (
            (await C.close(),
            new Error(
                `Error: missing HTML element with id: mdimg-body.\nHTML template ${f} is not valid.\n`,
            ))
        );
    };
function a(e) {
    return e.split(".")[0];
}
(exports.convert2img = o), (exports.mdimg = o);
