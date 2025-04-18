import pathlib

import flask

from langdon_core.langdon_manager import LangdonManager
from langdon_core import models as langdon_models
from langdon_gui.constants import PAGE_SIZE
from langdon_gui.repositories import (
    android_apps,
    domains,
    http_cookies,
    http_headers,
    ip_addresses,
    technologies,
    used_ports,
    vulnerabilities,
    web_directories,
    web_directories_screenshots,
)
from langdon_gui.schemas.domain_detail import DomainDetail
from langdon_gui.schemas.http_cookie_item import HttpCookieItem
from langdon_gui.schemas.http_header_item import HttpHeaderItem
from langdon_gui.schemas.promising_findings_response import PromisingFindingsResponse
from langdon_gui.schemas.technology_detail import TechnologyDetail
from langdon_gui.schemas.technology_item import TechnologyItem
from langdon_gui.schemas.web_directory_detail import WebDirectoryDetail
from langdon_gui.services import promissing_findings_manager
from langdon_core import langdon_logging
import logging

BASE_DIR = pathlib.Path(__file__).parent.parent.parent

sqlalchemy_engine_handler = logging.StreamHandler()
sqlalchemy_engine_handler.setFormatter(langdon_logging.log_formatter)
sqlalchemy_engine_handler.setLevel(logging.NOTSET)

sqlalchemy_engine_logger = logging.getLogger("sqlalchemy.engine")
sqlalchemy_engine_logger.setLevel(logging.INFO)
sqlalchemy_engine_logger.addHandler(sqlalchemy_engine_handler)

app = flask.Flask(__name__)


@app.route("/")
def gui():
    return flask.render_template("index.html")


@app.route("/api/overview")
def overview():
    with LangdonManager() as manager:
        return {
            "android_apps": android_apps.count(session=manager.session),
            "domains": domains.count(session=manager.session),
            "http_cookies": http_cookies.count(session=manager.session),
            "http_headers": http_headers.count(session=manager.session),
            "ip_addresses": ip_addresses.count(session=manager.session),
            "technologies": technologies.count(session=manager.session),
            "used_ports": used_ports.count(session=manager.session),
            "vulnerabilities": vulnerabilities.count(session=manager.session),
            "web_directories": web_directories.count(session=manager.session),
        }


@app.route("/api/promissingfindings")
def list_promissing_findings():
    with LangdonManager() as manager:
        total_counts = promissing_findings_manager.calculate_total_counts(
            manager=manager
        )
        rates = promissing_findings_manager.calculate_rates(total_counts)
        paginated_objects = promissing_findings_manager.fetch_paginated_objects(
            rates, manager=manager
        )
        serialized_objects = promissing_findings_manager.serialize_and_shuffle_objects(
            paginated_objects
        )
        current_page = flask.request.args.get("page", 0, type=int)
        are_there_more_pages = (current_page * PAGE_SIZE) <= total_counts.total
        next_page = current_page + 1 if are_there_more_pages else None

        return PromisingFindingsResponse(
            count=total_counts.total,
            next=next_page,
            results=serialized_objects,
        ).model_dump_json()


@app.route("/api/domains/<int:domain_id>")
def get_domain(domain_id: langdon_models.DomainId):
    with LangdonManager() as manager:
        domain = domains.get_by_id(domain_id, session=manager.session)

        return DomainDetail.from_domain_model(
            domain=domain,
        ).model_dump_json()


@app.route("/api/technologies/<int:technology_id>")
def get_technology(technology_id: langdon_models.TechnologyId):
    with LangdonManager() as manager:
        technology = technologies.get_by_id(technology_id, session=manager.session)

        return TechnologyDetail.from_technology_model(
            technology=technology,
        ).model_dump_json()


@app.route("/api/webdirectories/<int:web_directory_id>")
def get_web_directory(web_directory_id: langdon_models.WebDirectoryId):
    with LangdonManager() as manager:
        web_directory = web_directories.get_by_id(
            web_directory_id, session=manager.session
        )

        return WebDirectoryDetail.from_web_directory_model(web_directory).model_dump_json()


@app.route("/api/webdirectories/<int:web_directory_id>/technologies")
def list_technologies_for_web_directory(
    web_directory_id: langdon_models.WebDirectoryId,
):
    with LangdonManager() as manager:
        technologies_list = technologies.list_by_web_directory_id(
            web_directory_id, session=manager.session
        )

        return [
            TechnologyItem(
                id=technology.id, name=technology.name, version=technology.version
            ).model_dump(mode="json")
            for technology in technologies_list
        ]


@app.route("/api/webdirectories/<int:web_directory_id>/httpheaders")
def list_http_headers_for_web_directory(
    web_directory_id: langdon_models.WebDirectoryId,
):
    with LangdonManager() as manager:
        http_headers_list = http_headers.list_by_web_directory_id(
            web_directory_id, session=manager.session
        )

        return [
            HttpHeaderItem(id=http_header.id, name=http_header.name).model_dump(mode="json")
            for http_header in http_headers_list
        ]
    

@app.route("/api/webdirectories/<int:web_directory_id>/httpcookies")
def list_http_cookies_for_web_directory(
    web_directory_id: langdon_models.WebDirectoryId,
):
    with LangdonManager() as manager:
        http_cookies_list = http_cookies.list_by_web_directory_id(
            web_directory_id, session=manager.session
        )

        return [
            HttpCookieItem(id=http_cookie.id, name=http_cookie.name).model_dump(mode="json")
            for http_cookie in http_cookies_list
        ]


@app.route("/api/webdirectoriesscreenshots/<int:screenshot_id>/screenshot.png")
def get_screenshot_from_dir_id(screenshot_id: langdon_models.WebDirectoryScreenshotId):
    with LangdonManager() as manager:
        screenshot = web_directories_screenshots.get_by_id(
            screenshot_id, session=manager.session
        )

        return flask.send_file(
            screenshot.screenshot_path,
            mimetype="image/png",
            as_attachment=True,
            download_name=f"screenshot_{screenshot_id}.png",
        )
