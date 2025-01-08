from parsers import LogParser
from collections import defaultdict

class LogService:
    def __init__(self):
        self.log_entries = []
        self.severity_counts = defaultdict(int)
        self.parser = LogParser()

    def parse_log_file(self, filepath):
        self.log_entries = self.parser.parse(filepath)
        self.severity_counts = defaultdict(int)
        for entry in self.log_entries:
            self.severity_counts[entry.severity] += 1

    def get_logs(self, severity=None, search_term=None, page=1, limit=10):
        filtered_logs = self.log_entries

        if severity:
            filtered_logs = [log for log in filtered_logs if log.severity == severity]

        if search_term:
            filtered_logs = [log for log in filtered_logs if search_term.lower() in log.message.lower()]

        start = (page - 1) * limit
        end = start + limit

        # print("gggggg", filtered_logs)
        paginated_logs = filtered_logs[start:end]
        return [log.__dict__ for log in paginated_logs]

    def get_available_severities(self):
        return list(self.severity_counts.keys())
