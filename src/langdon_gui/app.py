import pathlib

import flask

from langdon_core.langdon_manager import LangdonManager
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
)
from langdon_gui.schemas.domain_detail import DomainDetail
from langdon_gui.schemas.promising_findings_response import PromisingFindingsResponse
from langdon_gui.schemas.technology_detail import TechnologyDetail
from langdon_gui.services import promissing_findings_manager

BASE_DIR = pathlib.Path(__file__).parent.parent.parent
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


@app.route("/api/technologies/<int:technology_id>")
def get_technology(technology_id: int):
    with LangdonManager() as manager:
        technology = technologies.get_by_id(technology_id, session=manager.session)

        return TechnologyDetail.from_technology_model(
            technology=technology,
        ).model_dump_json()


@app.route("/api/domains/<int:domain_id>")
def get_domain(domain_id: int):
    with LangdonManager() as manager:
        domain = domains.get_by_id(domain_id, session=manager.session)

        return DomainDetail.from_domain_model(
            domain=domain,
        ).model_dump_json()


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
