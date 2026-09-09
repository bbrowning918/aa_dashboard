import minify_html

with open("static/css/styles.css", "r", encoding="utf-8") as f:
    css_content = f.read()

minified_html = minify_html.minify(f"<style>{css_content}</style>", minify_css=True)
minified_css = minified_html.replace("<style>", "").replace("</style>", "")

with open("static/css/styles.min.css", "w", encoding="utf-8") as f:
    f.write(minified_css)
