#!/usr/bin/env python3
"""Compute summary statistics from Denver campaign finance contribution data."""
import csv
import sys
from collections import defaultdict

def main():
    reader = csv.DictReader(sys.stdin)

    by_committee = defaultdict(lambda: {"total": 0, "count": 0, "fef_count": 0, "fef_total": 0,
                                         "max_donation": 0, "max_donor": "", "donors": set(),
                                         "in_kind_total": 0, "monetary_total": 0})

    for row in reader:
        try:
            amt = float(row.get("Amount", "0") or "0")
        except ValueError:
            continue

        committee = row.get("Recipient Committee", "").strip()
        if not committee:
            continue

        c = by_committee[committee]
        c["total"] += amt
        c["count"] += 1
        c["monetary_total" if row.get("Contribution Type") == "Monetary" else "in_kind_total"] += amt

        if row.get("FEF Contribution") == "Yes":
            c["fef_count"] += 1
            c["fef_total"] += amt

        first = row.get("Contributor First Name", "").strip()
        last = row.get("Contributor Last Name", "").strip()
        org = row.get("Organization Name", "").strip()
        donor_name = org if org else f"{first} {last}".strip()

        if donor_name:
            c["donors"].add(donor_name)

        if amt > c["max_donation"]:
            c["max_donation"] = amt
            c["max_donor"] = donor_name

    print("=" * 80)
    print("CAMPAIGN FINANCE SUMMARY STATISTICS")
    print("=" * 80)

    for committee in sorted(by_committee.keys(), key=lambda k: by_committee[k]["total"], reverse=True):
        c = by_committee[committee]
        if abs(c["total"]) < 1:
            continue
        print(f"\n--- {committee} ---")
        print(f"  Total raised: ${c['total']:,.2f}")
        print(f"  Monetary: ${c['monetary_total']:,.2f}")
        print(f"  In-Kind: ${c['in_kind_total']:,.2f}")
        print(f"  Contributions: {c['count']}")
        print(f"  Unique donors: {len(c['donors'])}")
        print(f"  Avg contribution: ${c['total']/c['count']:,.2f}" if c['count'] > 0 else "")
        print(f"  Largest: ${c['max_donation']:,.2f} from {c['max_donor']}")
        if c["fef_count"] > 0:
            print(f"  FEF contributions: {c['fef_count']} totaling ${c['fef_total']:,.2f}")

    # Print ballot issue vs candidate breakdown
    print("\n" + "=" * 80)
    print("BALLOT ISSUE COMMITTEES")
    print("=" * 80)
    ballot_committees = {k: v for k, v in by_committee.items()
                        if any(x in k.lower() for x in ["vibrant", "citizen power", "kids vs", "majority vote",
                                                          "hands off", "pro-animal", "healing", "stronger",
                                                          "affordable", "stop the ban", "yes on", "hands off my hat"])}
    for committee in sorted(ballot_committees.keys(), key=lambda k: ballot_committees[k]["total"], reverse=True):
        c = ballot_committees[committee]
        print(f"  {committee}: ${c['total']:,.2f} ({c['count']} contributions, {len(c['donors'])} donors)")

    print("\n" + "=" * 80)
    print("CANDIDATE COMMITTEES (2027 CYCLE)")
    print("=" * 80)
    candidate_committees = {k: v for k, v in by_committee.items()
                           if k not in ballot_committees and abs(v["total"]) >= 1}
    for committee in sorted(candidate_committees.keys(), key=lambda k: candidate_committees[k]["total"], reverse=True):
        c = candidate_committees[committee]
        office = ""
        print(f"  {committee}: ${c['total']:,.2f} ({c['count']} contributions, {len(c['donors'])} donors, FEF: ${c['fef_total']:,.2f})")


if __name__ == "__main__":
    main()
